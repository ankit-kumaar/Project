
const signupForm = document.getElementById('signup-form')

signupForm.addEventListener('submit', signup)


async function signup(e) {

    try {

        e.preventDefault()
        // get the form input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        const userDetails = {
            name: name,
            email: email,
            password: password
        }

        //verify password length 
        console.log(typeof password)

        if (password.length < 8 || password.length > 20) {
            document.getElementById('signup-password-error').textContent = "* Passwords must be between 8 and 20 characters long."

            setTimeout(() => {
                document.getElementById('signup-password-error').textContent = ""
            }, 4000)

            return;
        }


        // verify if there any user exists with same email id

        const response = await axios.post('http://localhost:3000/user/signup/verify', userDetails)

        console.log(response.data)
        console.log(response.data.message)
        if (response.data.message == 'user found') {
            window.alert('An account with this email already exists. You can try logging in with this email.')
            clearInputFields()
             //close the signup modal and open login modal
             const loginModal = document.getElementById('login-modal')
             const signupModal=document.getElementById('signup-modal')
             signupModal.style.display='none'
             loginModal.style.display='block'
            return;
        }

        //create an account 
        const response1 = await axios.post('http://localhost:3000/user/signup', userDetails)

        if (response1.data.message == 'Account created successfully') {
            window.alert('Account created successfully!! Please login to your account.')
            clearInputFields();

            //close the signup modal and open login modal
            const loginModal = document.getElementById('login-modal')
            const signupModal=document.getElementById('signup-modal')
            signupModal.style.display='none'
            loginModal.style.display='block'
            
        }

    }
    catch (error) {
        console.log(error)

    }

}

//function to cleat input fields
function clearInputFields() {
    document.getElementById('name').value = ""
    document.getElementById('signup-email').value = ""
    document.getElementById('signup-password').value = ""

}


document.getElementById('login-here-link').addEventListener('click',(e)=>{
    e.preventDefault()
    //close the signup modal and open login modal
    const loginModal = document.getElementById('login-modal')
    const signupModal=document.getElementById('signup-modal')
    signupModal.style.display='none'
    loginModal.style.display='block'
})
