using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Projeto_jcm_g3_eixo_4_2025_1.Models
{
    public class UsuarioDto
    {
        public int? Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public Perfil Perfil { get; set; }
    }
}