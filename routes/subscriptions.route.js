import Router from 'express'

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => {
    res.send({ message: `get all subscriptions` }
    
    )
})

subscriptionRouter.get("/:id", (req, res) => {
  res.send({ message: `get all subscriptions of id ${req.params.id}` });
});

subscriptionRouter.post("/", (req, res) => {
  res.send({ message: `create new subscription` });
});

subscriptionRouter.put("/", (req, res) => {
  res.send({ message: `update all subscriptions` });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ message: `update subscriptions of id ${req.params.id}` });
});

subscriptionRouter.delete("/", (req, res) => {
  res.send({ message: `delete all subscriptions` });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ message: `delete subscription with id ${req.params.id}` });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({message: `get all upcoming subscriptions`})
})

export default subscriptionRouter