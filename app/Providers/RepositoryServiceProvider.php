<?php

namespace App\Providers;

use App\Repositories\CentreRepository;
use App\Repositories\HomeRepository;
use App\Repositories\IRepository;
use App\Repositories\OtherTeamRepository;
use App\Repositories\PoleRepository;
use App\Repositories\TeamMedicalRepository;
use App\Repositories\TeamRepository;
use App\Repositories\TeamTypeRepository;
use App\Services\CentreService;
use App\Services\HomeService;
use App\Services\OtherTeamService;
use App\Services\PoleService;
use App\Services\TeamMedicalService;
use App\Services\TeamService;
use App\Services\TeamTypeService;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
        $this->app->when(CentreService::class)
            ->needs(IRepository::class)
            ->give(CentreRepository::class);

        $this->app->when(PoleService::class)
            ->needs(IRepository::class)
            ->give(PoleRepository::class);

        $this->app->when(HomeService::class)
            ->needs(IRepository::class)
            ->give(HomeRepository::class);

        $this->app->when(TeamTypeService::class)
            ->needs(IRepository::class)
            ->give(TeamTypeRepository::class);

        $this->app->when(TeamService::class)
            ->needs(IRepository::class)
            ->give(TeamRepository::class);

        $this->app->when(TeamMedicalService::class)
            ->needs(IRepository::class)
            ->give(TeamMedicalRepository::class);

        $this->app->when(OtherTeamService::class)
            ->needs(IRepository::class)
            ->give(OtherTeamRepository::class);
    }
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
