export const currencyFormatter = amount => {
  const formatter = Intl.NumberFormat('es-CO', {
    currency: 'COP',
    style: 'currency'
  })

  return formatter.format(amount)
}
