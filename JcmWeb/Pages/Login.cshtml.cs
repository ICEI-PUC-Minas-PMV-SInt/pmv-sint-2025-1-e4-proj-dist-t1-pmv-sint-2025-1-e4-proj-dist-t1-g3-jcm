/*
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Http;

namespace JcmWeb.Pages
{
    public class LoginModel : PageModel
    {
        private readonly HttpClient _httpClient;

        [BindProperty]
        public AuthenticateDto LoginData { get; set; } = new AuthenticateDto();

        public string MensagemErro { get; set; }

        public LoginModel(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("ApiCliente");
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var response = await _httpClient.PostAsJsonAsync("api/usuarios/authenticate", LoginData);

            if (response.IsSuccessStatusCode)
            {
                var resultado = await response.Content.ReadFromJsonAsync<dynamic>();
                var token = resultado.jwtToken.ToString();

                // Salvar o token na sessão
                HttpContext.Session.SetString("JwtToken", token);

                return RedirectToPage("Index");
            }
            else
            {
                MensagemErro = "Login inválido. Verifique suas credenciais.";
                return Page();
            }
        }
    }
}
*/




/*
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace JcmWeb.Pages
{
    public class LoginModel : PageModel
    {
        public void OnGet()
        {
        }
    }
}
*/