import server from './backend/mock-server'
import React from 'react'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event' // Importing user-event library
import '@testing-library/jest-dom/extend-expect'
import Component from './frontend/components/Component' // Assuming Component is the name of the component being tested

let up, down, left, right, reset, submit
let squares, coordinates, steps, message, email

const updateStatelessSelectors = document => {
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
  email = document.querySelector('#email')
}

describe('Component tests', () => {
  beforeAll(() => { server.listen() })
  afterAll(() => { server.close() })
  beforeEach(() => {
    render(<Component />)
    updateStatelessSelectors(document)
    updateStatefulSelectors(document)
  })
  afterEach(() => {
    server.resetHandlers()
    document.body.innerHTML = ''
  })

  test('items on screen1', async () => {
    expect(await screen.findByText("Coordinates")).toBeVisible()
  })

  test('items on screen2', async () => {
    expect(await screen.findByText("Grid")).toBeVisible()
  })

  test('items on screen3', async () => {
    user.click(left)
    expect(await screen.findByText("you moved 1 time")).toBeVisible()
  })

  test('email input changes', async () => {
    user.type(email, 'bob@bob.com')
    expect(await screen.findByText("bob@bob.com")).toBeVisible()
  })
})
