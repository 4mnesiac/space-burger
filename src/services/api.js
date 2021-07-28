import { API } from 'components/app/app'
import { setCookie, getCookie } from 'utils/cookie'
//utility
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const refreshExpiredTokenApi = async (func, arg = null) => {
  const refreshToken = localStorage.getItem('token');
  if (refreshToken) {
    return Promise.reject('Нет токена')
  }
  try {
    const response = await fetch(`${API}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    })
    const res = await checkResponse(response)
    if (res && res.success) {
      setCookie('token', res.accessToken)
      localStorage.setItem('token', res.refreshToken)
      console.log('refresh success!')
      return func(arg)
    } else {
      throw new Error(res.message)
    }
  } catch (error) {
    console.log('Refresh error: ' + error.message)
  }
}

export const getUserApi = () => {
  return fetch(`${API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('token'),
    },
  })
    .then((response) => checkResponse(response))
    .catch((err) => {
      return Promise.reject(err)
    })
}

export const logoutRequestApi = async () => {
  try {
    const response = await fetch(`${API}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
      }),
    })
    return await checkResponse(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateUserApi = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${API}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('token'),
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    const res = await checkResponse(response)
    return res
  } catch (error) {
    console.log('Update user failed: ', error)
    return Promise.reject(error)
  }
}

export const loginRequestApi = async (form) => {
  try {
    const response = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    return await checkResponse(response)
  } catch (error) {
    console.log(error.message)
    return Promise.reject(error.message)
  }
}

export const registerRequestApi = async (form) => {
  try {
    const response = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    const res = await checkResponse(response)
    return res
  } catch (error) {
    console.log('Catched error ' + error.message)
    return Promise.reject(error.message)
  }
}

export const forgotPasswordApi = async (email) => {
  try {
    let response = await fetch(`${API}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
    const res = await checkResponse(response)
    if (res && res.success) {
      return res
    } else {
      return Promise.reject(res.message)
    }
  } catch (error) {
    console.log('Catched error ' + error.message)
    return Promise.reject(error.message)
  }
}

export const resetPasswordApi = async ({ password, token }) => {
  try {
    let response = await fetch(`${API}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
    const res = await checkResponse(response)
    if (res && res.success) {
      return res
    } else {
      return Promise.reject(res.message)
    }
  } catch (error) {
    console.log('Catched error ' + error.message)
    return Promise.reject(error.message)
  }
}

export const getAllOrdersApi = async () => {
  try {
    let response = await fetch(`${API}/orders/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('token'),
      },
    })
    const res = await checkResponse(response)
    if (res && res.success) {
      return res
    } else {
      return Promise.reject(res.message)
    }
  } catch (error) {
    console.log('Catched error ' + error.message)
    return Promise.reject(error.message)
  }
}

export const getUserOrdersApi = async () => {
  try {
    let response = await fetch(`${API}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('token'),
      },
    })
    const res = await checkResponse(response)
    if (res && res.success) {
      return res
    } else {
      return Promise.reject(res.message)
    }
  } catch (error) {
    console.log('Catched error ' + error.message)
    return Promise.reject(error.message)
  }
}

export const sendOrderApi = async (ids) => {
  try {
    const response = await fetch(`${API}/orders`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('token'),
      },
      body: JSON.stringify({
        ingredients: ids,
      }),
    })
    const res = await checkResponse(response)
    if (res && res.success) {
      return res
    } else {
      return Promise.reject(res.message)
    }
  } catch (error) {
    console.log('Catched error ' + error.message)
    return Promise.reject(error.message)
  }
}

export const getOrderByIdApi = async (id) => {
  try {
    let response = await fetch(`${API}/orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const res = await checkResponse(response)
    if (res && res.success) {
      console.log(res)
      return res
    } else {
      return Promise.reject(res.message)
    }
  } catch (error) {
    console.log('Catched error ' + error.message)
    return Promise.reject(error.message)
  }
}
