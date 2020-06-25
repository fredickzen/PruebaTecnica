using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PruebaTecnicaMiltiSF.Model
{
    public partial class tempdbContext : DbContext
    {
        public tempdbContext()
        {
        }

        public tempdbContext(DbContextOptions<tempdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Ciudad> Ciudad { get; set; }
        public virtual DbSet<Comuna> Comuna { get; set; }
        public virtual DbSet<MigrationHistory> MigrationHistory { get; set; }
        public virtual DbSet<Persona> Persona { get; set; }
        public virtual DbSet<Region> Region { get; set; }
        public virtual DbSet<Sexo> Sexo { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=LAPTOP-P9N4LF8T;Database=tempdb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ciudad>(entity =>
            {
                entity.HasKey(e => new { e.RegionCodigo, e.Codigo });

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.RegionCodigoNavigation)
                    .WithMany(p => p.Ciudad)
                    .HasForeignKey(d => d.RegionCodigo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ciudad_Region");
            });

            modelBuilder.Entity<Comuna>(entity =>
            {
                entity.HasKey(e => new { e.RegionCodigo, e.CiudadCodigo, e.Codigo });

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Ciudad)
                    .WithMany(p => p.Comuna)
                    .HasForeignKey(d => new { d.RegionCodigo, d.CiudadCodigo })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comuna_Ciudad");
            });

            modelBuilder.Entity<MigrationHistory>(entity =>
            {
                entity.HasKey(e => new { e.MigrationId, e.ContextKey })
                    .HasName("PK_dbo.__MigrationHistory");

                entity.ToTable("__MigrationHistory");

                entity.Property(e => e.MigrationId).HasMaxLength(150);

                entity.Property(e => e.ContextKey).HasMaxLength(300);

                entity.Property(e => e.Model).IsRequired();

                entity.Property(e => e.ProductVersion)
                    .IsRequired()
                    .HasMaxLength(32);
            });

            modelBuilder.Entity<Persona>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.ApellidoMaterno)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.ApellidoPaterno)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Direccion).HasColumnType("text");

                entity.Property(e => e.Email)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.FechaNacimiento).HasColumnType("date");

               /* entity.Property(e => e.Nombre)
                    .HasMaxLength(95)
                    .IsUnicode(false)
                    .HasComputedColumnSql("(CONVERT([varchar](95),(((rtrim(ltrim([ApellidoPaterno]))+' ')+isnull(rtrim(ltrim([ApellidoMaterno])),''))+', ')+rtrim(ltrim([Nombres])),(0)))");
                    */

                entity.Property(e => e.Nombres)
                    .IsRequired()
                    .HasMaxLength(45)
                    .IsUnicode(false);

                entity.Property(e => e.Observaciones).HasColumnType("text");

              /* entity.Property(e => e.Run)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasComputedColumnSql("(CONVERT([varchar],([dbo].[FormatInt]([RunCuerpo])+'-')+[RunDigito],(0)))");
                */

                entity.Property(e => e.RunDigito)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.SexoCodigoNavigation)
                    .WithMany(p => p.Persona)
                    .HasForeignKey(d => d.SexoCodigo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Persona_Sexo");

                entity.HasOne(d => d.Comuna)
                    .WithMany(p => p.Persona)
                    .HasForeignKey(d => new { d.RegionCodigo, d.CiudadCodigo, d.ComunaCodigo })
                    .HasConstraintName("FK_Persona_Comuna");
            });

            modelBuilder.Entity<Region>(entity =>
            {
                entity.HasKey(e => e.Codigo);

                entity.Property(e => e.Codigo).ValueGeneratedNever();

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NombreOficial)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Sexo>(entity =>
            {
                entity.HasKey(e => e.Codigo);

                entity.Property(e => e.Codigo).ValueGeneratedNever();

                entity.Property(e => e.Letra)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Apellido)
                    .HasColumnName("apellido")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Profesion)
                    .HasColumnName("profesion")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
