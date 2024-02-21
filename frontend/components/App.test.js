import server from './backend/mock-server'
import React from 'react'
import AppFunctional from './frontend/components/AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

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

  describe({
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
    test('items on screen1') {
      expect(screen.findByText("Coordinates")).toBeVisible()
    }
    test('items on screen2') {
      expect(screen.findByText("Grid")).toBeVisible()
    }
    test('items on screen3') {
      user.click(left)
      expect(screen.findByText("you moved 1 time")).toBeVisible()
    }
    test('email input changes') {
      user.input(email, 'bob@bob.com')
      expect(await screen.findByText("bob@bob.com"))toBeVisible()
    }
  })