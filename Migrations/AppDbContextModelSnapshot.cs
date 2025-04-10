﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Projeto_jcm_g3_eixo_4_2025_1.Models;

#nullable disable

namespace Projeto_jcm_g3_eixo_4_2025_1.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Projeto_jcm_g3_eixo_4_2025_1.Models.Alimentacao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CachorroId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Hora")
                        .HasColumnType("datetime2");

                    b.Property<int>("Medida")
                        .HasColumnType("int");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.Property<int>("Tipo")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CachorroId");

                    b.ToTable("Alimentações");
                });

            modelBuilder.Entity("Projeto_jcm_g3_eixo_4_2025_1.Models.Cachorro", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Nascimento")
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Raca")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Cachorros");
                });

            modelBuilder.Entity("Projeto_jcm_g3_eixo_4_2025_1.Models.CachorroUsuarios", b =>
                {
                    b.Property<int>("CachorroId")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("CachorroId", "UsuarioId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("CachorroUsuarios");
                });

            modelBuilder.Entity("Projeto_jcm_g3_eixo_4_2025_1.Models.LinkDto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AlimentacaoId")
                        .HasColumnType("int");

                    b.Property<int?>("CachorroId")
                        .HasColumnType("int");

                    b.Property<string>("Href")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Metodo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Rel")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AlimentacaoId");

                    b.HasIndex("CachorroId");

                    b.ToTable("LinkDto");
                });

            modelBuilder.Entity("Projeto_jcm_g3_eixo_4_2025_1.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Perfil")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("Projeto_jcm_g3_eixo_4_2025_1.Models.Alimentacao", b =>
                {
                    b.HasOne("Projeto_jcm_g3_eixo_4_2025_1.Models.Cachorro", "Cachorro")
                        .WithMany("Alimentacoes")
                        .HasForeignKey("CachorroId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cachorro");
                });

            modelBuilder.Entity("Projeto_jcm_g3_eixo_4_2025_1.Models.CachorroUsuarios", b =>
                {
                    b.HasOne("Projeto_jcm_g3_eixo_4_2025_1.Models.Cachorro", "Cachorro")
                        .WithMany("Usuarios")
                        .HasForeignKey("CachorroId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Projeto_jcm_g3_eixo_4_2025_1.Models.Usuario", "Usuario")
                        .WithMany("Cachorros")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cachorro");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Projeto_jcm_g3_eixo_4_2025_1.Models.LinkDto", b =>
                {
                    b.HasOne("Projeto_jcm_g3_eixo_4_2025_1.Models.Alimentacao", null)
                        .WithMany("Links")
                        .HasForeignKey("AlimentacaoId");

                    b.HasOne("Projeto_jcm_g3_eixo_4_2025_1.Models.Cachorro", null)
                        .WithMany("Links")
                        .HasForeignKey("CachorroId");
                });

            modelBuilder.Entity("Projeto_jcm_g3_eixo_4_2025_1.Models.Alimentacao", b =>
                {
                    b.Navigation("Links");
                });

            modelBuilder.Entity("Projeto_jcm_g3_eixo_4_2025_1.Models.Cachorro", b =>
                {
                    b.Navigation("Alimentacoes");

                    b.Navigation("Links");

                    b.Navigation("Usuarios");
                });

            modelBuilder.Entity("Projeto_jcm_g3_eixo_4_2025_1.Models.Usuario", b =>
                {
                    b.Navigation("Cachorros");
                });
#pragma warning restore 612, 618
        }
    }
}
