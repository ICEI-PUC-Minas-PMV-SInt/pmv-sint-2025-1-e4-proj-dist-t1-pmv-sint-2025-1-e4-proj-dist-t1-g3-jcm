using System.ComponentModel.DataAnnotations;

namespace Projeto_jcm_g3_eixo_4_2025_1.Models
{
    public class AuthenticateDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
