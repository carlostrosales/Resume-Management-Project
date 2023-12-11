using System;
using backend.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Context
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{
		}

		public DbSet<Company> Companies { get; set; }
		public DbSet<Job> Jobs { get; set; }
		public DbSet<Candidate> Candidates { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

		}
	}
}

