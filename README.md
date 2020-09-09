<h2>subject</h2>
key counter in memory data structure backed by persistence implemented using redis

<h2>api</h2>
<table>
  <tr>
    <th>method</th>
    <th>description</th>
  </tr>
  <tr>
    <td>increment(key)</td>
    <td>increment value by 1</td>
  </tr>
  <tr>
    <td>exist(key)</td>
    <td>check if key exist</td>
  </tr>
  <tr>
    <td>setTo1(key, expiredInSec)</td>
    <td>set value to 1 with expired time remaining</td>
  </tr>
  <tr>
    <td>get(key)</td>
    <td>get value</td>
  </tr>
  <tr>
    <td>init()</td>
    <td>first time initialization</td>
  </tr>
  <tr>
    <td>finish()</td>
    <td>used for testing to close the connection</td>
  </tr>
</table>


<h2>setup</h2>
setup require installtion of redis server on linux
to use it on windows 10 you need WSL