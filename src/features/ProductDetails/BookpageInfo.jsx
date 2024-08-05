import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'E:/SM VITA/Project/Bookworm/src/ui/BookpageInfo.css';
import ProductHeader from '../features/ProductLayout/ProductHeader';


function BookpageInfo() {
  return (
  <>
   <ProductHeader/>
    <Container>
    <Row className="book-info">
        <Col md={4}>
          <img src='./ebook1.png' alt="Book Cover" className="book-cover" />
        </Col>
        <Col md={8}>
          <h1 className="book-title">All The Light We Cannot See</h1>
          <p className="book-author">By Anthony Doerr <span className="book-date">1 July 2016</span></p>
          <h3 className="book-price">$ 379</h3>
          <div className="button-group">
            <Button variant="primary" className="buy-now">Buy Now</Button>
            <Button variant="outline-primary" className="add-to-cart">Add To Cart</Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Summary</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius nisl sed sit aliquet nullam pretium. Velit vel aliquam amet augue. Risus id purus dolor dolor. Sagittis at vulputate rhoncus pharetra purus vitae, ac. Sit nam eleifend mauris, duis mattis leo, ut. Viverra accumsan elementum vehicula orci magna. Elementum, euismod ut sed at ut non. Eget commodo mi scelerisque erat. Mus adipiscing et mattis vitae sapien turpis. Eu, sit urna, convallis in commodo, sed condimentum dictumst vitae. Ultricies aenean a non tincidunt tortor ut pulvinar. Vulputate viverra tempor sed turpis at blandit malesuada at quam. Enim cursus vitae turpis lectus egestas nunc risus.
          </p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-around">
          <Button variant="secondary" size="sm">Sci-Fi</Button>
          <Button variant="secondary" size="sm">Horror</Button>
          <Button variant="secondary" size="sm">Romance</Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>Information</h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <span><strong>Book Name</strong></span><br />
          <span>All The Light We Cannot See</span>
          <br /><br />
          <span><strong>Genre</strong></span><br />
          <span>Sci-Fi / Romance / Horror</span><br /><br />
        </Col>
        <Col>
          <span><strong>Diterbitkan Tanggal</strong><br/>1 July 2016</span><br /><br />
          
          <span><strong>Pages</strong><br/>310 Pages</span><br /><br />
          
        </Col>
        <Col>
          <span><strong>Language</strong></span><br />
          <span>English</span>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="outline-primary" size="lg" className='btn1'>See Comment</Button>
        </Col>
      </Row>
    </Container>

  </> 
  );
}

export default BookpageInfo;
