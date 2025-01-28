# The problem

We are given a set of integers $$ A = \{ x \mid x \in \mathbb{Z} \} $$.

There are constranints for $$x$$ and $$|A| $$:


$$ 1 \leq \|A\| \leq 10^5 $$ and $$-2^{31} \leq x \leq 2^{31} - 1 $$


We are required to find a number $$h$$, such that h is **smallest positive
integer not in A**.

Let $$ S $$ be a set such that:

$$
S = \{ s \mid s \in \mathbb{Z}^+ , s \notin A\}
$$

then $$ h  = \min(S) $$.


---

Now that we agree on the notation, our task is to find $$h$$ in $$A$$.

One way to do it is to find a way to transform $$A$$ into $$S$$.

Then we will find the minium in $$S$$ to get $$A$$.

Well take a look at $$A$$ and $$S$$ again:

$$ A = \{ x \mid x \in \mathbb{Z} \} $$.

$$
S = \{ s \mid s \in \mathbb{Z}^+ , s \notin A\}
$$

To get. $$h$$ from $$S$$ we can do something like:

Let,

$$
A' = |A| = \{ x' \mid x' = |x|, x \in A \} \\
\mathbb{Z}^+ = A' + S \\
S = \mathbb{Z}^+ - A' \\
$$

We know,

$$
h = \min(S) \\
h = \min(\mathbb{Z}^+ - A') \\
h = \min(\mathbb{Z}^+ - |A|) \\
$$

So, we take the set of positive integers, subtract the set |A| which is
A - negative values. Then we need the minium from this set.


But what do we make of it. Well the equation says that 

