const selectors = {
  cartLink: '#cartur',
  cartItems: '#tbodyid',
  orderModal: '#orderModal',
  nameInput: '#name',
  countryInput: '#country',
  cityInput: '#city',
  cardInput: '#card',
  monthInput: '#month',
  yearInput: '#year',
  purchaseConfirmation: '.sweet-alert',
} as const

const labels = {
  placeOrder: 'Place Order',
  purchase: 'Purchase',
  purchaseSuccess: 'Thank you for your purchase!',
} as const

type OrderData = {
  name: string
  country: string
  city: string
  card: string
  month: string
  year: string
}

class CartPage {
  openCart() {
    cy.get(selectors.cartLink).click()
  }

  verifyProductInCart(productName: string) {
    cy.get(selectors.cartItems)
      .contains('td', productName)
      .should('be.visible')
  }

  openPlaceOrderModal() {
    cy.contains('button', labels.placeOrder).click()
    cy.get(selectors.orderModal).should('be.visible')
  }

  verifyOrderModalVisible() {
    cy.get(selectors.orderModal).should('be.visible')
  }

  enterName(name: string) {
    cy.get(selectors.nameInput).type(name)
  }

  enterCountry(country: string) {
    cy.get(selectors.countryInput).type(country)
  }

  enterCity(city: string) {
    cy.get(selectors.cityInput).type(city)
  }

  enterCard(card: string) {
    cy.get(selectors.cardInput).type(card)
  }

  enterMonth(month: string) {
    cy.get(selectors.monthInput).type(month)
  }

  enterYear(year: string) {
    cy.get(selectors.yearInput).type(year)
  }

  submitOrder() {
    cy.get(selectors.orderModal)
      .contains('button', labels.purchase)
      .click()
  }

  verifyPurchaseSuccessful() {
    cy.get(selectors.purchaseConfirmation)
      .should('be.visible')
      .and('contain', labels.purchaseSuccess)
  }

  completeOrder(orderData: OrderData) {
    this.openPlaceOrderModal()
    this.enterName(orderData.name)
    this.enterCountry(orderData.country)
    this.enterCity(orderData.city)
    this.enterCard(orderData.card)
    this.enterMonth(orderData.month)
    this.enterYear(orderData.year)
    this.submitOrder()
  }
}

export const cartPage = new CartPage()
