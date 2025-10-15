// package it.back.back_app.book.service;

// import it.back.back_app.book.domain.Order;
// import org.springframework.stereotype.Service;

// import it.back.back_app.book.entity.BookEntity;
// import it.back.back_app.book.repository.BookRepository;
// import jakarta.transaction.Transactional;
// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class BookOrderService {

//     // private final OrderRepository orderRepository;
//     private final BookRepository bookRepository;

//     @Transactional
// public void completeOrder(Order order) {
//     for (OrderItem item : order.getItems()) {
//         BookEntity book = item.getBook();
//         book.increasePurchaseCount(item.getQuantity());
//     }

//     orderRepository.save(order);
// }

// }
