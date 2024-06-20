#include <bits/stdc++.h>
using namespace std;

void bfs_path(string src, string dest, map<string, vector<string>> &graph, map<pair<string, string>, string> &edges, map<string, string> &parent, map<string, int> &dist)
{
    queue<string> q;
    map<string, int> visited;
    q.push(src);
    visited[src] = 1;
    dist[src] = 0;
    parent[src] = "anyvalue";
    while (!q.empty())
    {
        string node = q.front();
        q.pop();
        for (auto child : graph[node])
        {
            if (visited.count(child) == 0)
            {
                q.push(child);
                visited[child] = 1;
                dist[child] = dist[node] + 1;
                parent[child] = node;
            }
        }
    }
    vector<string> path;
    if (parent.count(dest) == 0)
    {
        cout << "Impossible" << endl;
    }
    else
    {
        while (parent[dest] != "anyvalue")
        {
            string temp = parent[dest];
            path.push_back(edges[{temp, dest}]);
            dest = parent[dest];
        }
        reverse(path.begin(), path.end());
        cout << path.size() << endl;
        for (auto i : path)
        {
            cout << i << endl;
        }
    }
}

int main()
{
    map<string, vector<string>> graph;
    map<pair<string, string>, string> edges;

    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++)
    {
        string city1, city2, road;
        cin >> city1 >> city2 >> road;
        graph[city1].push_back(city2);
        edges[{city1, city2}] = road;
    }
    string src, dest;
    cin >> src >> dest;
    map<string, string> parent;
    map<string, int> dist;
    bfs_path(src, dest, graph, edges, parent, dist);
}
