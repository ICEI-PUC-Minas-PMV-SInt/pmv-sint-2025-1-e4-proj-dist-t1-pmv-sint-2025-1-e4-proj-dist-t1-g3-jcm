using System.ComponentModel.DataAnnotations.Schema;

namespace Projeto_jcm_g3_eixo_4_2025_1.Models
{
    [Table("CachorroUsuarios")]
    public class CachorroUsuarios
    {
        public int CachorroId { get; set; }
        public Cachorro Cachorro { get; set; }

        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
    }
}
