import request from 'superagent';
import Debug from 'debug';

var debug = new Debug('client:query');


function doQuery(q) {
  request
    .get('http://localhost:3000/data')
    .query({
      query: q
    })
    .end(function (err, res) {
      debug(err, res.body.data);
    });
}

//doQuery(`{product(id:"448456"){title}}`);
doQuery('{__schema { queryType { name, fields { name, description} }}}');
doQuery('{__schema{types{name,kind}}}');
//doQuery(`{search(query:"broek"){title, product_number}}`);
