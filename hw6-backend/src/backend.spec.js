
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
var post = {
            method: 'POST',
						//headers: {'Content-Type' : 'application/json'},
            body : {text: "Some random"}
}
var newHeadline = {
            method: 'PUT',
						//headers: {'Content-Type' : 'application/json'},
            body : {headline: "newHeadline"}
}
const url = path => `http://backendsof1.herokuapp.com${path}`

describe('Validate Profile Functionality', () => {

	it('should get the default headline for loggedinuser', (done) => {
		fetch(url("/headlines"))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.headlines[0].username).to.eql('sof1')
      expect(body.headlines[0].headline).to.eql('')
		})
		.then(done)
		.catch(done)
 	}, 500)

  /*
  it('should put and get back the headline for loggedinuser', (done) => {
    fetch(url("/headline"), newHeadline)
		.then(res => {
			expect(res.status).to.eql(200)
      return res.json()
		})
		.then(body => {
      console.log("body.headlines is",body.headlines)
			console.log("body is ", body)
			expect(body.headlines[0].username).to.eql('sof1')
      expect(body.headlines[0].headline).to.eql('newHeadline')
		})
		.then(done)
		.catch(done)
 	}, 500)
  */

  it('should get the headline for sof2', (done) => {
		fetch(url("/headlines/sof2"))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.headlines[0].username).to.eql('sof2')
      expect(body.headlines[0].headline).to.eql('fake profile headline')
      expect()
		})
		.then(done)
		.catch(done)
 	}, 500)

})



describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url("/articles"))
		.then(res => {
				expect(res.status).to.eql(200)
				return res.json()
		})
		.then(body =>{
			expect(body.articles).to.have.length.of.at.least(3)
		})
		.then(done)
		.catch(done)
	}, 500)



	it('should add two articles with successive article ids, and return the article each time', (done) => {

    var firstArticleId = null
		fetch(url("/article"), post)
    	.then(res => {
    			expect(res.status).to.eql(200)
    			return res.json()
    	})
    	.then(body =>{
        firstArticleId = body.articles[body.articles.length -1].id
    	})
    	.catch(done)


	fetch(url("/article"), post)
  	.then(res => {
  			expect(res.status).to.eql(200)
  			return res.json()
  	})
  	.then(body =>{
  			expect(body.articles[body.articles.length-1].id != firstArticleId)
  	})
  	.then(done)
  	.catch(done)
}, 500)



	it('should return an article with a specified id', (done) => {
		// call GET /article first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		fetch(url("/articles/3"))
		.then(res => {
				expect(res.status).to.eql(200)
				return res.json()
		})
		.then(body =>{
				expect(body.articles[0].id == 3)
		})
		.then(done)
		.catch(done)
	}, 500)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/85948"))
		.then(res => {
				expect(res.status).to.eql(404)
				return res.text()
		})
		.then(body =>{
				expect(body == "Not Found")
		})
		.then(done)
		.catch(done)
	}, 500)



});
