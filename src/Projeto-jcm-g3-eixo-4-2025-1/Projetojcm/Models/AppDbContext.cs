using Microsoft.EntityFrameworkCore;

namespace Projeto_jcm_g3_eixo_4_2025_1.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {       
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<CachorroUsuarios>()
                .HasKey(c => new { c.CachorroId, c.UsuarioId });

            builder.Entity<CachorroUsuarios>()
                .HasOne(c => c.Cachorro).WithMany(c => c.Usuarios)
                .HasForeignKey(c => c.CachorroId);

            builder.Entity<CachorroUsuarios>()
                .HasOne(c => c.Usuario).WithMany(c => c.Cachorros)
                .HasForeignKey(c => c.UsuarioId);
        }

        public DbSet<Cachorro> Cachorros { get; set; }
        public DbSet<Alimentacao> Alimentacoes { get; set; }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<CachorroUsuarios> CachorrosUsuarios { get; set; }
    }
}
