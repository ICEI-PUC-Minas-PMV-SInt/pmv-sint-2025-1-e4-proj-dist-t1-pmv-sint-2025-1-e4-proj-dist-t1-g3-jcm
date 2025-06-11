using System.ComponentModel.DataAnnotations;

namespace Projeto_jcm_g3_eixo_4_2025_1.Models
{
    public class AuthenticateDto
    {
    /*    [Required]
        public int Id { get; set; }
    */
        public int? Id { get; set; }  // ID Opcional

        public string Nome { get; set; }  // Nome do Usuário


        [Required]
        public string Password { get; set; }
    }
}
