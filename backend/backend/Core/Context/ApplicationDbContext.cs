﻿using System;
using backend.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Context
{
	public class ApplicationDbContext : DbContext
	{
		protected readonly IConfiguration Configuration;

		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : base(options)
		{
			Configuration = configuration;
		}
		
		public DbSet<Company> Companies { get; set; }
		public DbSet<Job> Jobs { get; set; }
		public DbSet<Candidate> Candidates { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
			options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Job>()
				.HasOne(job => job.Company)
				.WithMany(company => company.Jobs)
				.HasForeignKey(job => job.CompanyId);

			modelBuilder.Entity<Candidate>()
				.HasOne(candidate => candidate.Job)
				.WithMany(job => job.Candidates)
				.HasForeignKey(candidate => candidate.JobId);

			modelBuilder.Entity<Company>()
				.Property(company => company.Size)
				.HasConversion<string>();

            modelBuilder.Entity<Job>()
                .Property(job => job.Level)
                .HasConversion<string>();
        }
	}
}

