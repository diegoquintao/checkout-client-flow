
// Brazilian banks data based on BCB list
export interface Bank {
  code: string;
  name: string;
}

export const brazilianBanks: Bank[] = [
  { code: "001", name: "Banco do Brasil S.A." },
  { code: "033", name: "Banco Santander (Brasil) S.A." },
  { code: "104", name: "Caixa Econômica Federal" },
  { code: "237", name: "Banco Bradesco S.A." },
  { code: "341", name: "Itaú Unibanco S.A." },
  { code: "041", name: "Banco do Estado do Rio Grande do Sul S.A." },
  { code: "004", name: "Banco do Nordeste do Brasil S.A." },
  { code: "745", name: "Banco Citibank S.A." },
  { code: "422", name: "Banco Safra S.A." },
  { code: "208", name: "Banco BTG Pactual S.A." },
  { code: "655", name: "Banco Votorantim S.A." },
  { code: "077", name: "Banco Inter S.A." },
  { code: "260", name: "Nubank" },
  { code: "336", name: "Banco C6 S.A." },
  { code: "756", name: "Banco Cooperativo do Brasil S.A. - BANCOOB" },
  { code: "748", name: "Banco Cooperativo Sicredi S.A." },
  { code: "212", name: "Banco Original S.A." },
  { code: "389", name: "Banco Mercantil do Brasil S.A." },
  { code: "735", name: "Banco Neon S.A." },
  { code: "246", name: "Banco ABC Brasil S.A." },
  { code: "025", name: "Banco Alfa S.A." },
  { code: "184", name: "Banco Itaú BBA S.A." },
  { code: "021", name: "Banestes S.A. Banco do Estado do Espírito Santo" },
  { code: "479", name: "Banco ItauBank S.A." },
  { code: "623", name: "Banco PAN S.A." },
  { code: "633", name: "Banco Rendimento S.A." },
  { code: "707", name: "Banco Daycoval S.A." },
  { code: "600", name: "Banco Luso Brasileiro S.A." },
  { code: "243", name: "Banco Máxima S.A." }
];

// Generate display name for dropdown
export const getBankDisplayOptions = () => {
  return brazilianBanks.map(bank => ({
    value: bank.code,
    label: `${bank.code} - ${bank.name}`
  }));
};

// Get bank name by code
export const getBankNameByCode = (code: string) => {
  const bank = brazilianBanks.find(bank => bank.code === code);
  return bank ? bank.name : "";
};
