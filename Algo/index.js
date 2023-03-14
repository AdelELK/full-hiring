for(let i = 0; i <= 30; i++) {
    if (isDividableBy(i, 3) && isDividableBy(i, 5)) {
  	    console.log('FizzBuzz', i)
    }
    else if (isDividableBy(i, 3)) {
        console.log('Fizz', i)
    }
    else if (isDividableBy(i, 5)) {
        console.log('Buzz', i)
    }
    else {
        console.log(i)
    }
}

function isDividableBy(numerator, denominator) {
	return (numerator % denominator == 0)
}