export const status = {
  lastVerifiedAt: '2026-11-02',
  legalStatus: 'Amendement adopté en première lecture, non promulgué et non applicable',
  amendmentNo: 'I-1358',
  rate: 0.055,
  notice: "Aucun euro n'a été collecté par ce site. L'amendement n'est pas une loi en vigueur au 02/11/2026. Estimation brute hors plafonds et conditions d'application.",
  sources: [
    { label: "Amendement I-1358, Assemblée nationale", url: 'https://www.assemblee-nationale.fr/dyn/17/amendements/3210A/AN/1358', kind: 'officiel' },
    { label: 'Scrutin public n° 9336', url: 'https://www.assemblee-nationale.fr/dyn/17/scrutins/9336', kind: 'officiel' },
    { label: "Baromètre de l'interconnexion, Arcep", url: 'https://www.arcep.fr/cartes-et-donnees/nos-publications-chiffrees/linterconnexion-de-donnees/barometre-de-linterconnexion-de-donnees-en-france.html', kind: 'officiel' },
    { label: 'Réactions de Xavier Niel, VLC et OVHcloud, MacGeneration', url: 'https://www.macg.co/services/2026/11/xavier-niel-vlc-ovhcloud-personne-ne-semble-vouloir-de-la-taxe-au-gigaoctet-312069', kind: 'presse' },
    { label: 'Analyse technique et position du gouvernement, IT-Connect', url: 'https://www.it-connect.fr/taxe-gigaoctet-producteurs-donnees-numeriques/', kind: 'presse' },
    { label: "Explications sur le vote, Frandroid", url: 'https://www.frandroid.com/culture-tech/politique/3306281_trompes-de-bouton-lfi-se-desolidarise-de-la-taxe-au-gigaoctet-quelle-a-votee', kind: 'presse' },
    { label: 'Réactions et limites des simulations, Numerama', url: 'https://www.numerama.com/politique/2365427-taxe-au-gigaoctet-un-internaute-presente-une-facture-de-10-000-euros-au-depute-a-lorigine-du-texte.html', kind: 'presse' },
  ],
} as const;
