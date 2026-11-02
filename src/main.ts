import './styles/site.css';
import { status } from './content/status';
import { eurosForGB, liveEstimate, roundCurrency } from './lib/tax';
import { nationalProjection } from './lib/nationalProjection';
import { overlayUrl, parseOverlayParams, type OverlayConfig } from './lib/urlParams';
import { copyText, publicPageUrl } from './lib/share';

const $ = <T extends HTMLElement>(selector: string, root: ParentNode = document) => root.querySelector<T>(selector);
const fmt = (n: number, digits = 2) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n);
const money = (n: number, digits = 2) => `${fmt(n, digits)} €`;
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const baseUrl = () => new URL('.', document.baseURI).toString();

function initNationalCounter() {
  const counter = $<HTMLElement>('[data-national-counter]');
  if (!counter) return;
  const meter = $<HTMLElement>('[data-national-meter]');
  const update = () => {
    const projection = nationalProjection(Date.now());
    counter.textContent = money(projection.euros, 0);
    if (meter) meter.style.width = `${projection.progress * 100}%`;
  };
  update();
  window.setInterval(update, 1000);
  const explain = $<HTMLButtonElement>('[data-explain-projection]');
  const detail = $<HTMLElement>('[data-projection-detail]');
  explain?.addEventListener('click', () => {
    const opening = detail?.hidden ?? true;
    if (detail) detail.hidden = !opening;
    explain.setAttribute('aria-expanded', String(opening));
  });
}

function initSources() {
  const target = $<HTMLElement>('[data-sources]');
  if (!target) return;
  target.innerHTML = status.sources.map((source, i) => `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer"><span>${String(i + 1).padStart(2, '0')}</span><strong>${esc(source.label)}</strong><small>${source.kind === 'officiel' ? 'Source officielle' : 'Presse / analyse'}</small><span>↗</span></a>`).join('');
}

function initStatus() {
  const verifiedDate = new Date(`${status.lastVerifiedAt}T12:00:00`).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  document.querySelectorAll<HTMLElement>('[data-status-date]').forEach(node => {
    node.textContent = verifiedDate;
    if (node instanceof HTMLTimeElement) node.dateTime = status.lastVerifiedAt;
  });
  document.querySelectorAll<HTMLElement>('[data-status-notice]').forEach(node => { node.textContent = status.notice; });
  document.querySelectorAll<HTMLElement>('[data-legal-status]').forEach(node => { node.textContent = status.legalStatus; });
}

const scenarios = { video: 15, game: 100, cloud: 1000, custom: 0 } as const;
function initSimulator() {
  const page = document.body.dataset.page;
  if (page !== 'simulator') return;
  const volume = $<HTMLInputElement>('#gigabytes')!;
  const range = $<HTMLInputElement>('#volume-range')!;
  const standard = $<HTMLElement>('[data-standard-input]')!;
  const live = $<HTMLElement>('[data-live-input]')!;
  const euros = $<HTMLElement>('[data-result-euros]')!;
  const gb = $<HTMLElement>('[data-result-gb]')!;
  const hint = $<HTMLElement>('[data-scenario-hint]')!;
  const message = $<HTMLElement>('[data-sim-message]')!;
  let scenario = 'video';
  const recalc = () => {
    if (scenario === 'live') {
      const bitrate = Number($<HTMLInputElement>('#bitrate', live)?.value);
      const duration = Number($<HTMLInputElement>('#duration', live)?.value) * 3600;
      const viewers = Number($<HTMLInputElement>('#viewers', live)?.value);
      const result = liveEstimate(bitrate, duration, viewers);
      euros.textContent = money(roundCurrency(result.grossEur));
      gb.textContent = `${fmt(result.gigabytes)} Go`;
    } else {
      const v = Math.min(1_000_000_000, Math.max(0, Number(volume.value) || 0));
      euros.textContent = money(roundCurrency(eurosForGB(v)));
      gb.textContent = `${fmt(v)} Go`;
      if (scenario === 'cloud' && v === 1000) gb.textContent = '1 To = 1 000 Go';
    }
    const shared = new URL(location.href);
    shared.searchParams.set('scenario', scenario);
    if (scenario === 'live') {
      shared.searchParams.set('bitrate', String($<HTMLInputElement>('#bitrate', live)?.value ?? 6));
      shared.searchParams.set('duration', String($<HTMLInputElement>('#duration', live)?.value ?? 1));
      shared.searchParams.set('viewers', String($<HTMLInputElement>('#viewers', live)?.value ?? 1));
      shared.searchParams.delete('gb');
    } else {
      shared.searchParams.set('gb', volume.value || '0');
      shared.searchParams.delete('bitrate'); shared.searchParams.delete('duration'); shared.searchParams.delete('viewers');
    }
    history.replaceState(null, '', shared);
  };
  volume.addEventListener('input', () => { range.value = String(Math.min(500, Number(volume.value) || 0)); recalc(); });
  range.addEventListener('input', () => { volume.value = range.value; recalc(); });
  live.querySelectorAll('input').forEach(input => input.addEventListener('input', recalc));
  document.querySelectorAll<HTMLButtonElement>('[data-scenario]').forEach(button => button.addEventListener('click', () => {
    scenario = button.dataset.scenario ?? 'video';
    document.querySelectorAll('[data-scenario]').forEach(tab => tab.setAttribute('aria-selected', String(tab === button)));
    const isLive = scenario === 'live';
    standard.hidden = isLive;
    live.hidden = !isLive;
    const initial = scenario in scenarios ? scenarios[scenario as keyof typeof scenarios] : 15;
    if (!isLive) {
      volume.value = String(initial);
      range.value = String(Math.min(500, initial));
      const hints: Record<string, string> = { video: 'Exemple indicatif : une session vidéo, hypothèse de 15 Go.', game: 'Exemple indicatif : téléchargement d’un jeu de 100 Go.', cloud: '1 To décimal = 1 000 Go. Le volume dépend de votre sauvegarde.', custom: 'Saisissez un volume décimal personnalisé en Go.' };
      hint.textContent = hints[scenario] ?? hints.custom;
    }
    message.textContent = '';
    recalc();
  }));
  const shareText = () => `J’ai calculé ${gb.textContent}. Selon le barème hypothétique de GOFUNDÉTAT, cela ferait ${euros.textContent} bruts théoriques, hors plafonds, si le dispositif devenait applicable. Aucun euro n’est collecté par ce site. #GOFUNDÉTAT`;
  $('[data-copy-result]')?.addEventListener('click', async () => { message.textContent = await copyText(shareText()) ? 'Résultat copié.' : 'Copie impossible ici. Sélectionnez le texte à partager manuellement.'; });
  $('[data-share-result]')?.addEventListener('click', async () => {
    if (navigator.share) { try { await navigator.share({ title: 'GOFUNDÉTAT · simulation', text: shareText(), url: location.href }); } catch { /* Annulation utilisateur */ } }
    else message.textContent = await copyText(`${shareText()} ${location.href}`) ? 'Texte et lien copiés.' : 'Partage non disponible. Copiez le lien depuis la barre d’adresse.';
  });
  const params = new URLSearchParams(location.search);
  if (params.has('gb')) volume.value = String(Math.min(1_000_000_000, Math.max(0, Number(params.get('gb')) || 0)));
  const initialScenario = params.get('scenario');
  if (initialScenario === 'live') {
    scenario = 'live'; standard.hidden = true; live.hidden = false;
    const bitrate = $<HTMLInputElement>('#bitrate', live); const duration = $<HTMLInputElement>('#duration', live); const viewers = $<HTMLInputElement>('#viewers', live);
    if (params.has('bitrate') && bitrate) bitrate.value = String(Math.min(100, Math.max(.001, Number(params.get('bitrate')) || 6)));
    if (params.has('duration') && duration) duration.value = String(Math.min(8760, Math.max(0, Number(params.get('duration')) || 0)));
    if (params.has('viewers') && viewers) viewers.value = String(Math.min(1_000_000, Math.max(0, Number(params.get('viewers')) || 0)));
    document.querySelectorAll('[data-scenario]').forEach(tab => tab.setAttribute('aria-selected', String((tab as HTMLElement).dataset.scenario === 'live')));
  } else if (initialScenario && initialScenario in scenarios) {
    scenario = initialScenario;
    if (!params.has('gb')) volume.value = String(scenarios[initialScenario as keyof typeof scenarios]);
    range.value = String(Math.min(500, Number(volume.value) || 0));
    document.querySelectorAll('[data-scenario]').forEach(tab => tab.setAttribute('aria-selected', String((tab as HTMLElement).dataset.scenario === initialScenario)));
  }
  recalc();
}

function configFromForm(form: HTMLFormElement, startedAt?: number): OverlayConfig {
  const data = new FormData(form);
  const pick = <T extends string>(key: string, allowed: T[], fallback: T): T => { const value = data.get(key); return typeof value === 'string' && allowed.includes(value as T) ? value as T : fallback; };
  return {
    mode: 'estimated', bitrate: Math.min(100, Math.max(0.001, Number(data.get('bitrate')) || 6)),
    viewers: Math.min(1_000_000, Math.max(0, Number(data.get('viewers')) || 0)),
    startedAt: startedAt ?? Date.now(), format: pick('format', ['compact', 'vertical', 'ticker'], 'compact'),
    theme: pick('theme', ['dark', 'light', 'minimal'], 'dark'), accent: pick('accent', ['yellow', 'violet', 'white'], 'yellow'),
  };
}

function initObs() {
  if (document.body.dataset.page !== 'obs') return;
  const form = $<HTMLFormElement>('[data-obs-form]')!;
  const preview = $<HTMLIFrameElement>('[data-overlay-preview]')!;
  const output = $<HTMLElement>('[data-overlay-output]')!;
  const urlField = $<HTMLInputElement>('#overlay-url')!;
  const message = $<HTMLElement>('[data-obs-message]')!;
  let startedAt = Date.now();
  const updatePreview = (newSession = false) => {
    if (newSession) startedAt = Date.now();
    const config = configFromForm(form, startedAt);
    preview.src = overlayUrl(config, baseUrl());
  };
  form.addEventListener('input', () => updatePreview());
  form.addEventListener('change', () => updatePreview());
  form.addEventListener('submit', e => { e.preventDefault(); updatePreview(true); const url = overlayUrl(configFromForm(form, startedAt), baseUrl()); urlField.value = url; output.hidden = false; message.textContent = 'URL générée. Les paramètres sont publics et ne contiennent aucun secret.'; });
  form.addEventListener('reset', () => window.setTimeout(() => { output.hidden = true; message.textContent = ''; updatePreview(true); }, 0));
  $('[data-copy-overlay]')?.addEventListener('click', async () => { message.textContent = await copyText(urlField.value) ? 'URL copiée.' : 'Copie impossible. Sélectionnez l’URL manuellement.'; });
  $('[data-open-overlay]')?.addEventListener('click', e => { (e.currentTarget as HTMLAnchorElement).href = urlField.value; });
  updatePreview();
}

function initOverlay() {
  if (document.body.dataset.page !== 'overlay') return;
  const config = parseOverlayParams(new URLSearchParams(location.search));
  const card = $<HTMLElement>('[data-overlay-card]')!;
  card.classList.add(`theme-${config.theme}`, `accent-${config.accent}`, `format-${config.format}`);
  const tick = () => {
    const duration = Math.max(0, Math.min(31_536_000, (Date.now() - config.startedAt) / 1000));
    const result = liveEstimate(config.bitrate, duration, config.viewers);
    $('[data-overlay-gb]')!.textContent = `≈ ${fmt(result.gigabytes)} Go`;
    $('[data-overlay-euros]')!.textContent = `≈ ${money(result.grossEur)}`;
  };
  tick();
  window.setInterval(tick, 1000);
}

function initWidget() {
  if (document.body.dataset.page !== 'widgets') return;
  const theme = $<HTMLSelectElement>('#widget-theme')!;
  const width = $<HTMLInputElement>('#widget-width')!;
  const height = $<HTMLInputElement>('#widget-height')!;
  const urlField = $<HTMLInputElement>('#widget-url')!;
  const snippet = $<HTMLTextAreaElement>('#widget-snippet')!;
  const preview = $<HTMLIFrameElement>('[data-widget-preview]')!;
  const message = $<HTMLElement>('[data-widget-message]')!;
  const update = () => {
    const w = Math.min(1200, Math.max(280, Number(width.value) || 360));
    const h = Math.min(500, Math.max(140, Number(height.value) || 180));
    width.value = String(w); height.value = String(h);
    const url = new URL('embed.html', baseUrl()); url.searchParams.set('theme', ['dark','light','minimal'].includes(theme.value) ? theme.value : 'dark');
    urlField.value = url.toString();
    snippet.value = `<iframe src="${urlField.value}" title="GOFUNDÉTAT : projection satirique de taxe au Go" width="${w}" height="${h}" loading="lazy" referrerpolicy="no-referrer"></iframe>`;
    preview.src = urlField.value; preview.width = String(w); preview.height = String(h);
  };
  [theme, width, height].forEach(input => input.addEventListener('input', update));
  $('[data-copy-widget]')?.addEventListener('click', async () => { message.textContent = await copyText(snippet.value) ? 'Code iframe copié.' : 'Copie impossible. Sélectionnez le code manuellement.'; });
  update();
}

function drawShareCard(canvas: HTMLCanvasElement, format: string) {
  const dimensions = format === 'story' ? [1080, 1920] : format === 'wide' ? [1200, 675] : [1080, 1080];
  canvas.width = dimensions[0]!; canvas.height = dimensions[1]!;
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  ctx.fillStyle = '#171c38'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#6756e8'; ctx.fillRect(canvas.width * .72, 0, canvas.width * .28, canvas.height);
  ctx.fillStyle = '#facc15'; ctx.fillRect(60, 60, 110, 110);
  ctx.fillStyle = '#171c38'; ctx.font = 'bold 44px system-ui'; ctx.fillText('GO', 82, 129);
  ctx.fillStyle = '#facc15'; ctx.font = 'bold 30px system-ui'; ctx.fillText('SATIRE · COMPTEURS SIMULÉS', 60, 245);
  ctx.fillStyle = '#f8fafc'; ctx.font = `800 ${canvas.width * .075}px system-ui`;
  ctx.fillText('VOTRE DATA', 60, canvas.height * .42); ctx.fillText('FAIT TOURNER', 60, canvas.height * .51); ctx.fillText('LA FRANCE.', 60, canvas.height * .60);
  ctx.fillStyle = '#b8c5e9'; ctx.font = '500 34px system-ui'; ctx.fillText('0,055 € / Go · amendement budgétaire 2027', 60, canvas.height * .70);
  ctx.fillStyle = '#facc15'; ctx.font = 'bold 26px system-ui'; ctx.fillText('0 € COLLECTÉ PAR CE SITE', 60, canvas.height * .83);
  ctx.fillStyle = '#f8fafc'; ctx.font = '24px system-ui'; ctx.fillText(`Statut au ${new Date(`${status.lastVerifiedAt}T12:00:00`).toLocaleDateString('fr-FR')}`, 60, canvas.height * .88);
  ctx.fillText('GOFUNDÉTAT · Simulation satirique', 60, canvas.height * .93);
}

function initShare() {
  if (document.body.dataset.page !== 'share') return;
  const canvas = $<HTMLCanvasElement>('[data-share-canvas]')!;
  const format = $<HTMLSelectElement>('#share-format')!;
  const text = $<HTMLTextAreaElement>('#share-copy')!;
  const message = $<HTMLElement>('[data-share-message]')!;
  const draw = () => drawShareCard(canvas, format.value);
  format.addEventListener('change', draw); draw();
  $('[data-download-card]')?.addEventListener('click', () => { const link = document.createElement('a'); link.download = `gofundetat-simulation-${format.value}.png`; link.href = canvas.toDataURL('image/png'); link.click(); });
  $('[data-copy-share]')?.addEventListener('click', async () => { message.textContent = await copyText(text.value) ? 'Texte copié.' : 'Copie impossible. Sélectionnez le texte manuellement.'; });
  $('[data-web-share]')?.addEventListener('click', async () => {
    if (navigator.share) { try { await navigator.share({ title: 'GOFUNDÉTAT · satire', text: text.value, url: publicPageUrl('') }); } catch { /* Annulation utilisateur */ } }
    else message.textContent = await copyText(`${text.value} ${publicPageUrl('')}`) ? 'Texte et lien copiés.' : 'Partage non disponible. Copiez le lien depuis la barre d’adresse.';
  });
}

function initEmbed() {
  if (document.body.dataset.page !== 'embed') return;
  const theme = new URLSearchParams(location.search).get('theme');
  $('[data-embed-widget]')?.classList.add(`theme-${theme === 'light' || theme === 'minimal' ? theme : 'dark'}`);
  const counter = $('[data-embed-counter]');
  const meter = $('[data-embed-meter]') as HTMLElement | null;
  const update = () => { const projection = nationalProjection(Date.now()); if (counter) counter.textContent = money(projection.euros, 0); if (meter) meter.style.width = `${projection.progress * 100}%`; };
  update(); window.setInterval(update, 1000);
}

initStatus(); initNationalCounter(); initSources(); initSimulator(); initObs(); initOverlay(); initWidget(); initShare(); initEmbed();
