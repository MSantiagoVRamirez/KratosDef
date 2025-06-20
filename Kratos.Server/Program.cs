    // Pseudocódigo:
    // 1. Definir la política CORS con el nombre correcto y el origen específico.
    // 2. Registrar la política en los servicios.
    // 3. Usar la política en el middleware antes de Authentication y Authorization.
    // 4. Asegurarse de que el nombre de la política coincida en ambos lugares.

    using kratos.Server.Services.Seguridad;
    using Kratos.Server.Models;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

    var builder = WebApplication.CreateBuilder(args);

    // 1. Configurar servicios
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("MyAllowSpecificOrigins",
            policy =>
            {
                policy.WithOrigins("https://localhost:54366") // Reemplaza con el origen de tu frontend
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials(); // Si necesitas cookies o autenticación
            });
    });

builder.Services.AddDbContext<KratosContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

    options.UseMySql(
        connectionString,
        new MySqlServerVersion(new Version(8, 0, 21)), // Versión de tu servidor MySQL
        mysqlOptions =>
        {
            mysqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null);

            mysqlOptions.SchemaBehavior(MySqlSchemaBehavior.Translate,
                (schema, entity) => $"{schema ?? "dbo"}_{entity}");

            // Opcional: Configuración de logging
            mysqlOptions.EnableStringComparisonTranslations();
        });

    // Opcional: Habilitar logging detallado
    if (builder.Environment.IsDevelopment())
    {
        options.EnableSensitiveDataLogging()
               .EnableDetailedErrors();
    }
});
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(options =>
        {
            options.LoginPath = "/Login/IniciarSesion";
            options.LogoutPath = "/Login/CerrarSesion";
            options.AccessDeniedPath = "/AccesoDenegado";
        });

    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();

    // 2. Configuración de Swagger
    builder.Services.AddSwaggerGen();
    builder.Services.AddOpenApi();
    builder.Services.AddScoped<IUsuarioService, Usuario>();

    var app = builder.Build();

    // 3. Middleware de archivos estáticos y routing
    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseRouting();

    app.UseCors("MyAllowSpecificOrigins"); // Usar el nombre correcto de la política

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
    app.MapFallbackToFile("/index.html");

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        app.MapOpenApi();
    }

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<KratosContext>();
    dbContext.Database.Migrate();
}
app.Run();
    //https://localhost:7054/swagger/index.html En tu Program.cs o Startup.cs
