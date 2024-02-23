// JavaScript
async function handleLogin() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    console.log(username, password)
    const {data} = await axios.get("http://localhost:3001/api/v1/products/category/Toys")
    console.log(data);
}