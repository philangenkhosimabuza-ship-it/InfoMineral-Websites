<?php
namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $total = Task::count();
        $cleaned = $total ? round(Task::where('status', 'cleaned')->count() / $total * 100) : 0;
        $pending = $total ? round(Task::where('status', 'pending')->count() / $total * 100) : 0;
        $errors  = $total ? round(Task::where('status', 'error')->count() / $total * 100) : 0;

        return view('dashboard', compact('cleaned', 'pending', 'errors'));
    }

    public function store(Request $request)
    {
        Task::create([
            'status' => $request->status
        ]);

        return redirect('/dashboard');
    }
}
?>