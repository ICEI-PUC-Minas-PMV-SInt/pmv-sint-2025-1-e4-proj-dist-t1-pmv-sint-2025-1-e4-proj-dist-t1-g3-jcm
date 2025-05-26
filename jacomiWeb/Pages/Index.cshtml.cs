using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace jacomiWeb.Pages
{
    public class IndexModel : PageModel
    {
        public void OnGet() =>
            ViewData["ApiUrl"] = Environment.GetEnvironmentVariable("API_URL") ?? "http://localhost:44315";
    }
}

/*
 using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace jacomiWeb.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}
 */