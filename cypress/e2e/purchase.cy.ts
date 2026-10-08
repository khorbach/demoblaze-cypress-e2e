import { homePage } from '../pages/home.page'
import { productPage } from '../pages/product.page'
import { cartPage } from '../pages/cart.page'
import { stubAlert, verifyAlert } from '../support/helpers'
import testData from '../fixtures/test-data.json'

describe('Purchase Flow', () => {
  const password = testData.users.defaultPassword
  const username = `qa_purchase_${Date.now()}`
  const laptop = testData.products.laptop

  before(() => {
    homePage.visit()
    homePage.signUp(username, password)
  })

  beforeEach(() => {
    homePage.visit()
    homePage.login(username, password)
  })

  it('Verify a laptop can be added to the cart', () => {
    productPage.addProductToCart(laptop)
    cartPage.openCart()

    cartPage.verifyProductInCart(laptop)
  })

  it('Verify successful laptop purchase', () => {
    productPage.addProductToCart(laptop)
    cartPage.openCart()
    cartPage.completeOrder(testData.checkout)

    cartPage.verifyPurchaseSuccessful()
  })

  it('Validate purchase cannot proceed without required data', () => {
    productPage.addProductToCart(laptop)
    cartPage.openCart()
    cartPage.openPlaceOrderModal()
    stubAlert()
    cartPage.submitOrder()

    verifyAlert('Please fill out Name and Creditcard.')
    cartPage.verifyOrderModalVisible()
  })
})
