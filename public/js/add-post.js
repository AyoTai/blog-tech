async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('#post-text').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(`====== add post ======`)
    if (response.ok) {
      console.log(`====== add post response ok ======`)
      document.location.replace('/dashboard');
    } else {
      console.log(`====== add post response bad ======`)
      alert(response.statusText);
    }
}
  
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);