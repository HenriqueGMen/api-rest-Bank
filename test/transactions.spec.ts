import { it, afterAll, beforeAll, describe, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'child_process'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        tittle: 'Transaction test',
        amount: 500,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    let cookies: string[] = []

    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        tittle: 'Transaction test',
        amount: 500,
        type: 'credit',
      })

    const cookie = createTransactionResponse.get('Set-Cookie')

    if (cookie) {
      cookies = cookies.concat(cookie)
    }

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        tittle: 'Transaction test',
        amount: 500,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    let cookies: string[] = []

    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        tittle: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookie = createTransactionResponse.get('Set-Cookie')

    if (cookie) {
      cookies = cookies.concat(cookie)
    }

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.transactions).toEqual(
      expect.objectContaining({
        tittle: 'New transaction',
        amount: 5000,
      }),
    )
  })

  it('should be able to get the summary', async () => {
    let cookies: string[] = []

    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        tittle: 'Credit transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookie = createTransactionResponse.get('Set-Cookie')

    if (cookie) {
      cookies = cookies.concat(cookie)
    }

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        tittle: 'Debit transaction',
        amount: 2000,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})
