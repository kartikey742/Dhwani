<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="collegeWebsite.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        function validateForm() {
            var name = document.getElementById("name").value.trim();
            var password = document.getElementById("password").value.trim();

            // Validation for Name
            if (name.length < 6 || !/^[a-zA-Z]+$/.test(name)) {
                alert("Name should contain alphabets only and should be at least 6 characters long.");
                return false;
            }

            // Validation for Password
            if (password.length < 6) {
                alert("Password should be at least 6 characters long.");
                return false;
            }

            return true;
        }
    </script>
</head>
<body>
    <table border>
        <!-- Table rows -->
        <tr>
            <!-- College header row -->
        </tr>
        <tr>
            <!-- Navigation row -->
        </tr>
        <tr>
            <!-- Registration form row -->
        </tr>
    </table>
    <form action="p" onsubmit="return validateForm()">
        <!-- Registration form fields -->
        <input type="text" id="name" placeholder="NAME"><br>
        <input type="password" id="password" placeholder="PASSWORD"><br>
        <!-- Other form fields -->
        <button type="submit">SUBMIT</button>
    </form>
</body>
</html>
