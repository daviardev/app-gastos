export const currencyFormatter = amount => {
  if (amount >= 10 ** 11) {
    const formattedAmount = amount.toExponential(2)
    return formattedAmount.replace(/e\+/, 'x10^')
  }

  const formatter = Intl.NumberFormat('es-CO', {
    currency: 'COP',
    style: 'currency'
  })

  return formatter.format(amount)
}
