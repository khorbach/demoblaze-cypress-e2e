const selectors = {
  categoryLink: 'a',
  productLink: '.card-title a',
  productName: '.name',
  addToCartLink: 'a',
} as const

const labels = {
  laptops: 'Laptops',
  addToCart: 'Add to cart',
} as const

class ProductPage {
  selectLaptopCategory() {
    cy.contains(selectors.categoryLink, labels.laptops).click()
  }

  openProduct(productName: string) {
    cy.contains(selectors.productLink, productName)
      .should('be.visible')
      .click()
  }

  verifyProductName(productName: string) {
    cy.get(selectors.productName)
      .should('be.visible')
      .and('contain', productName)
  }

  addToCart() {
    cy.contains(selectors.addToCartLink, labels.addToCart).click()
  }

  addProductToCart(productName: string) {
    this.selectLaptopCategory()
    this.openProduct(productName)
    this.addToCart()
  }
}

export const productPage = new ProductPage()
