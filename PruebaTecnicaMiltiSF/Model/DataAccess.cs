using Microsoft.EntityFrameworkCore;

namespace PruebaTecnicaMiltiSF.Model{

public class PruebaTecnicaMiltiSFDbContext : DbContext{
    public PruebaTecnicaMiltiSFDbContext(DbContextOptions<PruebaTecnicaMiltiSFDbContext> data)
    :base (data){}
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ciudad>()
            .HasKey(c => new { c.Codigo});

        modelBuilder.Entity<Comuna>()
            .HasKey(c => new { c.Codigo});

        modelBuilder.Entity<Region>()
            .HasKey(c => new { c.Codigo});

        modelBuilder.Entity<Sexo>()
            .HasKey(c => new { c.Codigo});
    }

    public DbSet<Region> Region{get; set;}
    public DbSet<Ciudad> Ciudad{get; set;}
    public DbSet<Comuna> Comuna{get; set;}
    public DbSet<Sexo> Sexo{get; set;}
    public DbSet<Persona> Persona{get; set;}
    
    }
}