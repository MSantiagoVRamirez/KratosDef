public static class GenerarToken
{
    public static strin GenerarToken(){
        var token = new byte [32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(token);
        }
        return Convert.ToBase64String(tokenBytes);

    }
}