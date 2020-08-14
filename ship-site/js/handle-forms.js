const contactForm = {
  formEl: document.querySelector("#contact-form"),
  loadingEl: document.querySelector("#contact-form-loading"),
  wrapperEl: document.querySelector('#contact-form-wrapper'),
  successEl: document.querySelector('#contact-form-success'),
  humanErrorEl: document.querySelector('#contact-form-errors'),
  errorList: document.querySelector('#contact-form-error-list'),
  connectionErrorEl: document.querySelector('#contact-form-connection-error'),
  humanErrorStart: function () {
    showEl(this.humanErrorEl)
    showEl(this.formEl)
  },
  humanErrorEnd: function () { hideEl(this.humanErrorEl) },
  handleSuccess: function (response) {
    showEl(this.successEl)
    hideEl(this.humanErrorEl)
  },
}

function handleHumanErrors(errors, form, beginCb, endCb) {
  let errorsClosed = 0
  beginCb()
  errors.map((error) => {
    let element = document.querySelector(`#${error.param}`)
    const labelContent = document.querySelector(`label[for="${error.param}"]`).innerHTML
    let parentId = element.getAttribute("data-parent")
      ? element.getAttribute("data-parent")
      : error.param
    const hasErr = element.getAttribute("data-has-err")
    if (parseInt(hasErr) != 1) {
      element.setAttribute("data-has-err", 1)
      let errorMessage = document.createElement("span")

      let errorListItem = document.createElement("li")
      errorListItem.setAttribute("class", `msg-${error.param}`)
      let errorLink = document.createElement("a")
      errorLink.innerHTML = labelContent
      errorLink.setAttribute("href", `#${parentId}`)
      errorListItem.innerHTML = errorLink.outerHTML
      form.errorList.insertAdjacentElement("beforeend", errorListItem)

      errorMessage.classList.add(`msg`)
      errorMessage.classList.add(`msg-${error.param}`)
      errorMessage.setAttribute("role", "alert")
      errorMessage.innerHTML = error.msg
      element.insertAdjacentElement("beforebegin", errorMessage)

      element.classList.add("error")
      let addedMsg = document.querySelectorAll(`.msg-${error.param}`)
      element.addEventListener("change", () => {
        errorsClosed++
        element.classList.remove("error")
        element.setAttribute("data-has-err", 0)
        addedMsg.forEach((el) => el.remove())
        if (errors.length === errorsClosed) {
          endCb()
        }
      })
    }
  })
}


function handleForm(form) {
  form.formEl.addEventListener("submit", (evt) => {
    showEl(form.loadingEl)
    hideEl(form.formEl)
    hideEl(form.connectionErrorEl)
    hideEl(form.humanErrorEl)
    window.scrollTo(0, 0)
    evt.preventDefault()

    const FD = new FormData(form.formEl)
    fetch(form.formEl.getAttribute("action"), {
      method: "POST",
      body: FD,
    })
      .then((response) => response.json())
      .then((result) => {
        hideEl(form.loadingEl)
        if (result.errors) {
          handleHumanErrors(
            result.errors,
            form,
            () => {
              form.humanErrorStart()
            },
            () => form.humanErrorEnd()
          )
        } else {
          form.handleSuccess(result)
        }
      })
      .catch(error => {
        console.error(error)
        hideEl(form.loadingEl)
        showEl(form.connectionErrorEl)
        showEl(form.formEl)
      })
  })
}

handleForm(contactForm)