import axios from "axios";

for (let i = 11; i < 49; i++) {
    const user = await axios.post("http://localhost:3001/api/v1/users/register", {
        username: `Devansh${i}`,
        email: "test@gmail.com",
        password: "12345",
        phoneNumber: 12345
    })
}