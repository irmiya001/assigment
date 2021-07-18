console.log('it works')
const postDiv = document.querySelector('.post');
const content = document.querySelector('.content');
const username = document.querySelector('.username');
const btn = document.querySelector('.btn');
const postDetail = document.querySelector('.content')
const postId = document.querySelector('.post-id')

var fragment = document.createDocumentFragment();


fetch(`http://localhost:3090/users/get-all-post`, {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        data.result.map(post => {
            console.log(post.User.firstName, post.content)
            
       
        const content = document.createElement('p')
        const userName = document.createElement('p')

        content.textContent = post.content
        content.classList.add('content')

        userName.textContent = post.User.firstName
        userName.classList.add('username')

        fragment.appendChild(content)
        fragment.appendChild(userName)
        postDiv.appendChild(fragment)

        content.addEventListener('click', () => {
          console.log(post.id)
          localStorage.removeItem('postId')
          localStorage.setItem('postId', post.id)
          window.location.href = 'post-detail'
        })
        
       

        })


        })
        .catch((error) => {
        console.error('Error:', error);
        });

        
        

// const postFunction = () => {
  // postDetail.addEventListener('click', () => {
  //   console.log(postId.textContent)
  // })        

// }

// setTimeout(() => {
//   postFunction()
// }, 5000);