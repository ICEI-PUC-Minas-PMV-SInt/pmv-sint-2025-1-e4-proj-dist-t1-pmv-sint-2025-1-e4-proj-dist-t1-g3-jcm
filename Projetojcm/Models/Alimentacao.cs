using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projeto_jcm_g3_eixo_4_2025_1.Models
{
    [Table("Alimentações")]
    public class Alimentacao : LinksHATEOS
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Hora")]
        public DateTime Hora { get; set; } = DateTime.Now;

        [Required(ErrorMessage = "Obrigatório Informar o Tipo de Alimentação!")]
        [Display(Name = "Tipo de Alimentação")]
        public TipoAlimentacao Tipo { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Quantidade de Alimento administrada!")]
        [Display(Name = "Quantidade")]
        public int Quantidade { get; set; }

        [Required(ErrorMessage = "Obrigatório Informar a Unidade de Medida!")]
        [Display(Name = "Unidade de Medida")]
        public UnidadeMedida Medida { get; set; }

        [Required]
        public int CachorroId { get; set; }

        public Cachorro Cachorro { get; set; }


    }

    public enum TipoAlimentacao
    {
        Ração_Seca,
        Ração_Úmida,
        Alimento_Caseiro,
        Petisco,
        Alimento_Cru
    }

    public enum UnidadeMedida
    {
        Copo,
        gramas,
        Scoop,
        Vasilhame
    }
}
