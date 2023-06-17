document.querySelectorAll('.share').forEach(elem => {

    elem.addEventListener('click', e => {
        e.preventDefault();

        if (navigator.share) {
            navigator.share({
                title: 'Evilazio Ricarte\'s Portfolio',
                text: 'Look the portfolio of this Senior Full Stack Engineer',
                url: 'https://evilazio.dev',
            })
                .then(() => {
                    console.log('Successful share')
                })
                .catch((error) => console.log('Error sharing', error));
        } else {
            console.log('Share not supported on this browser, do it the old way.');
        }
    })
})

