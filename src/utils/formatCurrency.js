/**
 * Helper untuk memformat angka nominal ke format Rupiah (IDR)
 * Contoh: 20000 -> Rp 20.000
 * @param {number|string} amount
 * @returns {string}
 */
export const formatRupiah = (amount) => {
  const numericValue = typeof amount === 'number' ? amount : Number(amount) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericValue).replace(/\u00a0/g, ' ');
};

export default formatRupiah;
