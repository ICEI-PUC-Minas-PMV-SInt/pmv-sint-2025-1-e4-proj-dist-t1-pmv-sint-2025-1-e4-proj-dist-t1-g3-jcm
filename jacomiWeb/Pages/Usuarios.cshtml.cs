using Microsoft.AspNetCore.Mvc.RazorPages;

namespace jacomiWeb.Pages
{
    public class UsuariosModel : PageModel
    {
        public void OnGet() =>
            ViewData["ApiUrl"] = Environment.GetEnvironmentVariable("API_URL") ?? "http://localhost:44315";
    }
}