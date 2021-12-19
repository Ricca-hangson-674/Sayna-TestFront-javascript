# Sayna-TestFront-javascript
Test Sayna micro tasker backend 

# Firstname et lastname doit etre superieur à 5 caracteres
# date_naissance doit etre de format MM/JJ/AAAA


# POST /register
{
    "firstname": "firstname 23", 
	"lastname": "lastname 12", 
	"date_naissance": "02/20/1997",
	"sexe": "male",
	"email": "email@gmail.com", 
	"password": "password"
}

# PUT /user/cart
{
    "cartNumber": "6011-6427-4538-5369",
    "month": 11,
    "year": 2021,
    "defaultParam": false
}

# PUT /subscription
{
    "idCart": "6011-6427-4538-5369",
    "cvc": 1234
}