
I have not redone the entire structure of the project, in most cases I always write in es6 without using modules, and also do not use var, but I decided to leave the project in the same writing style that you provided.

I chose Mongoose with MongoDB to work with, but I can also work with Sequelize using SQLITE, MySQL, Postresql

I would also like to say right away, I didn't quite understand this test,

    it('should get 404 if the trade ID does not exist', async () => {  
	    const response = await chai.request(server).get(`/trades/32323`)  
	    response.should.have.status(404);  
	    response.text.should.eql('ID not found');  
	})

but I decided to leave it as it is, but here I rewrote it to just send, instead of sending a clear json with a clear template object

    if (!trade) {  
	    return res.status(404).send('ID not found');  
    }
