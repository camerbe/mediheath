<?php

namespace App\Providers;

use App\Repositories\CentreRepository;
use App\Repositories\IRepository;
use App\Repositories\PoleRepository;
use App\Repositories\Repository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        /*$this->app->bind(IRepository::class,Repository::class);
        $this->app->bind(IRepository::class,PoleRepository::class);
        $this->app->bind(IRepository::class,CentreRepository::class);*/
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
