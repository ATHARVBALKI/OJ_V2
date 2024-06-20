#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> graph;
int vertices;
int edges;

void addEdges(int i, int j)
{
    //self edge
    if(i==j){
        graph[i].push_back(j);
    }
    else{
        graph[i].push_back(j);
        graph[j].push_back(i);
    }
    return;
}
void removeEdges(int i, int j)
{
    graph[i].erase(find(graph[i].begin(), graph[i].end(), j));
    graph[j].erase(find(graph[j].begin(), graph[j].end(), i));
    return;
}
bool isEdge(int i, int j)
{
    return find(graph[i].begin(), graph[i].end(), j) != graph[i].end();
}
void printGraph()
{
    for (int i = 1; i <= vertices; i++)
    {
        cout << i << " : ";
        for (int j = 0; j < graph[i].size(); j++)
        {
            cout << graph[i][j] << " ";
            
        }
        cout << endl;
    }
    return;
}

vector<int> bfs(vector<vector<int>> graph, int vertices, int src){
    queue<int> q;
    vector<bool> visited(vertices+1,false);
    vector<int> dist(vertices+1, 0);
    visited[src] = true;
    q.push(src);

    while(!q.empty()){
        int node = q.front();
        q.pop();
        for(int i=0 ; i<graph[node].size() ; i++)
        if(visited[graph[node][i]] == false){
            q.push(graph[node][i]);
            visited[graph[node][i]] = true;
            dist[graph[node][i]] = dist[node] + 1;
        }
    }
    return dist;
}
int main()
{

    cin >> vertices >> edges;
    graph = vector<vector<int>>(vertices+1);
    for (int i = 1; i <= edges; i++)
    {
        int a, b;
        cin >> a >> b;
        addEdges(a, b);
    }
    // printGraph();

    int src, dest;
    cin>>src>>dest;
    vector<int> dist  = bfs(graph, vertices, src);

    cout<<dist[dest];
    // for(int i=1; i<=vertices ; i++){
    //     cout<<i<<" "<< dist[i]<<" ";
    //     cout<<endl;
    // }
}