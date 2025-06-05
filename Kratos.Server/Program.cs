using kratos.Server.Services.Seguridad;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Kratos.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar servicios
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policyBuilder => policyBuilder.AllowAnyOrigin()
                                      .AllowAnyMethod()
                                      .AllowAnyHeader());
});

builder.Services.AddDbContext<KratosContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

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

// 3. Middleware de archivos estáticos
app.UseDefaultFiles();
app.UseStaticFiles();

// 4. Middleware de Swagger (solo en desarrollo)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}
// 5. Seguridad y rutas
app.UseHttpsRedirection();

app.UseAuthentication(); // Muy importante que esté ANTES de Authorization
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
//https://localhost:7054/swagger/index.html